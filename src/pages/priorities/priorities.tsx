import { dictionaryQueryClient } from "@/constants/dictionaryQueryClient.const";
import { useCompanyQuery } from "@/hooks/companies/useCompanyQuery";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Row, Select, Space, Typography } from "antd";
import { useMemo, useState } from "react";
import type { IPartner } from "@/types/IPartner.type";
import {
    clientTypeOptions,
    entityPage,
    getUfName,
    hasClientType,
    normalizePartnerUfs,
    type PriorityClientTypeFilter,
    useListEntity,
    useUpdateEntity,
} from "./config-page.const";
import { PriorityTable, type PriorityRow } from "./components/table";

type AppliedFilters = {
    companyId: number;
    clientType: PriorityClientTypeFilter;
};

export function PrioritiesPage() {
    const [companyId, setCompanyId] = useState<number | undefined>(undefined);
    const [clientType, setClientType] = useState<PriorityClientTypeFilter | undefined>(undefined);
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilters | null>(null);
    const [overridesByUf, setOverridesByUf] = useState<Record<string, number | undefined>>({});

    const { data: companiesData, isLoading: isCompaniesLoading } = useCompanyQuery();

    const { data: partnersData, isLoading: isPartnersLoading } = useQuery({
        queryKey: [dictionaryQueryClient.partners.key, "priority-screen"],
        queryFn: () => dictionaryQueryClient.partners.service.getAll(),
        retry: 2,
    });

    const updateMutation = useUpdateEntity();

    const priorityFilters = useMemo(
        () => {
            if (!appliedFilters) return undefined;

            if (appliedFilters.clientType === "PF e PJ") {
                return { company_id: appliedFilters.companyId };
            }

            return {
                company_id: appliedFilters.companyId,
                client_type: appliedFilters.clientType,
            };
        },
        [appliedFilters],
    );

    const { data: prioritiesData, isLoading: isPrioritiesLoading } = useListEntity(
        priorityFilters,
        { enabled: !!appliedFilters },
    );

    const selectedPriorityByUf = useMemo(() => {
        const fromApi: Record<string, number | undefined> = {};
        (prioritiesData ?? []).forEach((p) => { fromApi[p.uf] = p.partner_id; });
        return { ...fromApi, ...overridesByUf };
    }, [prioritiesData, overridesByUf]);

    const companyOptions = useMemo(
        () =>
            companiesData?.companies.map((company) => ({
                label: company.company_name,
                value: company.company_id,
            })) ?? [],
        [companiesData],
    );

    const filteredPartners = useMemo(() => {
        if (!appliedFilters)
            return [] as IPartner[];

        return (partnersData?.partners ?? []).filter(
            (partner) =>
                partner.company_id === appliedFilters.companyId &&
                hasClientType(partner, appliedFilters.clientType),
        );
    }, [appliedFilters, partnersData]);

    const rows = useMemo<PriorityRow[]>(() => {
        const allUfs = filteredPartners.flatMap((partner) => normalizePartnerUfs(partner));
        const uniqueUfs = Array.from(new Set(allUfs)).sort((a, b) => a.localeCompare(b));

        return uniqueUfs.map((uf) => {
            const partnerOptions = filteredPartners
                .filter((partner) => normalizePartnerUfs(partner).includes(uf))
                .map((partner) => ({
                    label: partner.partner_name,
                    value: partner.partner_id,
                }));

            return {
                uf,
                stateName: getUfName(uf),
                partnerOptions,
            };
        });
    }, [filteredPartners]);

    // const selectedCompanyLabel = useMemo(
    //     () => companyOptions.find((option) => option.value === appliedFilters?.companyId)?.label,
    //     [appliedFilters?.companyId, companyOptions],
    // );

    // const selectedClientTypeLabel = useMemo(
    //     () => clientTypeOptions.find((option) => option.value === appliedFilters?.clientType)?.label,
    //     [appliedFilters?.clientType],
    // );

    function handleSearch() {
        if (!companyId || !clientType)
            return;

        setAppliedFilters({ companyId, clientType });
        setOverridesByUf({});
    }

    function handleChangePriority(uf: string, partnerId: number | undefined) {
        setOverridesByUf((prev) => ({
            ...prev,
            [uf]: partnerId,
        }));
    }

    function handleSave() {
        if (!appliedFilters) return;
        if (appliedFilters.clientType === "PF e PJ") return;
        const clientTypeToSave = appliedFilters.clientType;

        Object.entries(selectedPriorityByUf).forEach(([uf, partnerId]) => {
            if (partnerId !== undefined) {
                updateMutation.mutate({
                    company_id: appliedFilters.companyId,
                    partner_id: partnerId,
                    uf,
                    client_type: clientTypeToSave,
                });
            }
        });
    }

    const isLoading = isCompaniesLoading || isPartnersLoading || isPrioritiesLoading;

    return (
        <div className="py-6">
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
                <div>
                    <Typography.Title level={3} style={{ marginBottom: 4 }}>
                        {entityPage.plural}
                    </Typography.Title>

                </div>


                <Row gutter={16} align="bottom">
                    <Col>
                        <Typography.Text strong>Empresa</Typography.Text>
                        <Select
                            allowClear
                            placeholder="Selecione a empresa"
                            style={{ width: "100%", marginTop: 8 }}
                            options={companyOptions}
                            value={companyId}
                            onChange={setCompanyId}
                        />
                    </Col>
                    <Col className="flex flex-col">
                        <Typography.Text strong>Atuação</Typography.Text>
                        <Select
                            allowClear
                            placeholder="Selecione a atuação"
                            style={{ width: "300px", marginTop: 8 }}
                            options={clientTypeOptions}
                            value={clientType}
                            onChange={(value) => setClientType(value as PriorityClientTypeFilter | undefined)}
                        />
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            block
                            disabled={!companyId || !clientType}
                            onClick={handleSearch}
                        >
                            Buscar Estados
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type="default"
                            block
                            disabled={!appliedFilters || appliedFilters.clientType === "PF e PJ" || updateMutation.isPending}
                            loading={updateMutation.isPending}
                            onClick={handleSave}
                        >
                            Salvar Prioridades
                        </Button>
                    </Col>
                </Row>


                <PriorityTable
                    rows={rows}
                    isLoading={isLoading}
                    selectedByUf={selectedPriorityByUf}
                    onChangePriority={handleChangePriority}
                />

            </Space>
        </div>
    );
}
