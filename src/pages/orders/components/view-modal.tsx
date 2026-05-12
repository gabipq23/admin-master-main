import { Col, Modal, Row, Button, Divider } from "antd";
import { entityPage, type EntityType } from "../config-page.const";
import ReadonlyField from "@/layout/common-components/ReadOnlyField";
import { formatPaymentMethod, formatPhoneNumber } from "@/utils/number.utils";
import { formatCEP, formatCPF } from "@/utils/document.util";
import { formatBrowserDisplay, formatDevice, formatOSDisplay, formatResolution } from "@/utils/orders.util";

interface ViewModalProps {
    open: boolean;
    viewingEntity: EntityType | null;
    onClose: () => void;
    onEdit?: (entity: EntityType) => void;
    onDelete?: (entity: EntityType) => void;
}

export function ViewModal({
    open,
    viewingEntity,
    onClose,
    onEdit,
    onDelete,
}: ViewModalProps) {
    return (
        <Modal
            open={open}
            title={`Visualizar ${entityPage.name}`}
            footer={
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <Button
                        type="primary"
                        onClick={() => viewingEntity && onEdit?.(viewingEntity)}
                    >
                        Editar
                    </Button>
                    <Button
                        danger
                        onClick={() => viewingEntity && onDelete?.(viewingEntity)}
                    >
                        Deletar
                    </Button>
                </div>
            }
            onCancel={onClose}
            destroyOnHidden
            width={910}
        >
            <div className="max-h-150 overflow-y-auto scrollbar-thin">
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>

                    {/* Detalhes dos Planos */}
                    {/* <PlanosTable plans={Array.isArray(viewingEntity) ? viewingEntity : [viewingEntity]} /> */}

                    {/* Disponibilidade e PAP */}
                    <Divider style={{ fontSize: 13, color: '#666' }}>Disponibilidade</Divider>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <div style={{ background: '#fff', borderRadius: 6, padding: 16, textAlign: 'center', border: '1px solid #f0f0f0' }}>
                                <p style={{ fontSize: 14, fontWeight: 500, color: '#555', marginBottom: 8 }}>Disponibilidade</p>
                                {/* <AvailabilityStatus viewingEntity={viewingEntity} /> */}
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ background: '#fff', borderRadius: 6, padding: 16, textAlign: 'center', border: '1px solid #f0f0f0' }}>
                                <p style={{ fontSize: 14, fontWeight: 500, color: '#555', marginBottom: 8 }}>PAP</p>
                                {/* <PAPStatus viewingEntity={viewingEntity} /> */}
                            </div>
                        </Col>
                    </Row>

                    {/* Informações de Pagamento */}
                    <Divider style={{ fontSize: 13, color: '#666' }}>Informações de Pagamento</Divider>
                    <div className=" bg-neutral-100  rounded-sm p-3 w-full">
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <ReadonlyField label="Método de Pagamento" value={formatPaymentMethod(viewingEntity?.payment_method)} />
                            </Col>
                            <Col span={12}>
                                <ReadonlyField label="Nome do Banco" value={viewingEntity?.bank_name || '-'} />
                            </Col>
                            <Col span={12}>
                                <ReadonlyField label="Agência" value={viewingEntity?.bank_branch || '-'} />
                            </Col>
                            <Col span={12}>
                                <ReadonlyField label="Número da Conta" value={viewingEntity?.bank_account_number || '-'} />
                            </Col>
                            <Col span={12}>
                                <ReadonlyField label="Titular da Conta" value={viewingEntity?.bank_account_holder_name || '-'} />
                            </Col>
                            <Col span={12}>
                                <ReadonlyField label="CPF do Titular" value={formatCPF(viewingEntity?.bank_account_holder_cpf || '') || '-'} />
                            </Col>
                        </Row>
                    </div>

                    {/* Informações do Cliente */}
                    <Divider style={{ fontSize: 13, color: '#666' }}>Informações do Cliente</Divider>

                    <div className=" bg-neutral-100  rounded-sm p-3 w-full">    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                <div style={{ position: 'relative' }}>
                                    <img
                                        src={viewingEntity?.whatsapp?.avatar || '/assets/anonymous_avatar.png'}
                                        style={{
                                            width: 40, height: 40, borderRadius: '50%',
                                            outline: viewingEntity?.pf_temperature === 10 ? '2px solid #d63535' : 'none'
                                        }}
                                    />
                                    {viewingEntity?.pf_temperature === 10 && (
                                        <span style={{ position: 'absolute', top: -4, right: -4, fontSize: 12 }}>🔥</span>
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <ReadonlyField label="Nome" value={viewingEntity?.full_name} />
                        </Col>
                        <Col span={12}>
                            <ReadonlyField label="Nome (RFB)" value={viewingEntity?.rfb_name} />
                        </Col>
                        <Col span={8}>
                            <ReadonlyField
                                label="Gênero"
                                value={viewingEntity?.rfb_gender === 'M' ? 'Masculino' : viewingEntity?.rfb_gender === 'F' ? 'Feminino' : '-'}
                            />
                        </Col>
                        <Col span={8}>
                            <ReadonlyField label="CPF" value={formatCPF(viewingEntity?.cpf || '') || '-'} />
                        </Col>
                        <Col span={8}>
                            <ReadonlyField label="Email" value={viewingEntity?.email} />
                        </Col>
                        <Col span={8}>
                            <ReadonlyField label="Data de Nascimento" value={viewingEntity?.birth_date} />
                        </Col>
                        <Col span={8}>
                            <ReadonlyField label="Data Nascimento (RFB)" value={viewingEntity?.rfb_birth_date} />
                        </Col>
                        <Col span={8}>
                            <ReadonlyField label="Nome da Mãe" value={viewingEntity?.mother_full_name} />
                        </Col>
                        <Col span={8}>
                            <ReadonlyField label="Nome Mãe (RFB)" value={viewingEntity?.rfb_mother_name} />
                        </Col>
                    </Row></div>

                    {/* Contato */}
                    <Divider style={{ fontSize: 13, color: '#666' }}>Contato</Divider>
                    <div className=" bg-neutral-100  rounded-sm p-3 w-full">     <Row gutter={[16, 16]}>
                        {/* Telefone Principal */}
                        <Col span={12}>
                            <p style={{ fontSize: 12, fontWeight: 500, color: '#888', marginBottom: 8 }}>Telefone Principal</p>
                            <Row gutter={[8, 8]}>
                                <Col span={24}><ReadonlyField label="Número" value={formatPhoneNumber(viewingEntity?.phone || '')} /></Col>
                                <Col span={12}><ReadonlyField label="Anatel" value={viewingEntity?.phone_valid ? 'Sim' : viewingEntity?.phone_valid == null ? '-' : 'Não'} /></Col>
                                <Col span={12}><ReadonlyField label="Operadora" value={viewingEntity?.operator} /></Col>
                                <Col span={12}><ReadonlyField label="Portado" value={viewingEntity?.portability} /></Col>
                                <Col span={12}><ReadonlyField label="Data da Portabilidade" value={viewingEntity?.portability_date || '-'} /></Col>
                            </Row>
                        </Col>

                        {/* Telefone Adicional */}
                        <Col span={12}>
                            <p style={{ fontSize: 12, fontWeight: 500, color: '#888', marginBottom: 8 }}>Telefone Adicional</p>
                            <Row gutter={[8, 8]}>
                                <Col span={24}><ReadonlyField label="Número" value={formatPhoneNumber(viewingEntity?.additional_phone || '')} /></Col>
                                <Col span={12}><ReadonlyField label="Anatel" value={viewingEntity?.additional_phone_valid ? 'Sim' : viewingEntity?.additional_phone_valid == null ? '-' : 'Não'} /></Col>
                                <Col span={12}><ReadonlyField label="Operadora" value={viewingEntity?.additional_operator} /></Col>
                                <Col span={12}><ReadonlyField label="Portado" value={viewingEntity?.additional_portability} /></Col>
                                <Col span={12}><ReadonlyField label="Data da Portabilidade" value={viewingEntity?.additional_portability_date || '-'} /></Col>
                            </Row>
                        </Col>
                    </Row></div>

                    {/* Informações Empresariais */}
                    <Divider style={{ fontSize: 13, color: '#666' }}>Informações Empresariais</Divider>
                    <div className=" bg-neutral-100  rounded-sm p-3 w-full">     <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <ReadonlyField label="Sócio" value={viewingEntity?.is_socio ? 'Sim' : 'Não'} />
                        </Col>
                        <Col span={8}>
                            <ReadonlyField label="MEI" value={viewingEntity?.is_mei ? 'Sim' : 'Não'} />
                        </Col>
                        <Col span={24}>
                            {/* <EmpresasDisplay empresas={viewingEntity?.company_partners} /> */}
                        </Col>
                    </Row></div>

                    {/* Endereço */}
                    <Divider style={{ fontSize: 13, color: '#666' }}>Endereço</Divider>
                    <div className=" bg-neutral-100  rounded-sm p-3 w-full">     <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <ReadonlyField label="Rua" value={viewingEntity?.address || '-'} />
                        </Col>
                        <Col span={6}>
                            <ReadonlyField label="Número" value={viewingEntity?.address_number || '-'} />
                        </Col>
                        <Col span={6}>
                            <ReadonlyField
                                label="Complemento"
                                value={
                                    viewingEntity?.address_complement?.building_or_house === 'house'
                                        ? viewingEntity?.address_complement?.home_complement || '-'
                                        : viewingEntity?.address_complement?.building_or_house === 'building'
                                            ? `${viewingEntity?.address_complement?.unit_type || '-'} ${viewingEntity?.address_complement?.unit_number || '-'}`
                                            : '-'
                                }
                            />
                        </Col>
                        <Col span={8}>
                            <ReadonlyField label="Bairro" value={viewingEntity?.district || '-'} />
                        </Col>
                        <Col span={8}>
                            <ReadonlyField label="Cidade" value={viewingEntity?.city || '-'} />
                        </Col>
                        <Col span={8}>
                            <ReadonlyField label="UF" value={viewingEntity?.state || '-'} />
                        </Col>
                        <Col span={6}>
                            <ReadonlyField label="CEP" value={formatCEP(viewingEntity?.zip_code || '')} />
                        </Col>
                        <Col span={6}>
                            <ReadonlyField label="CEP Único" value={viewingEntity?.single_zip_code ? 'Sim' : 'Não'} />
                        </Col>
                        <Col span={6}>
                            <ReadonlyField label="Quadra" value={viewingEntity?.address_complement?.square || '-'} />
                        </Col>
                        <Col span={6}>
                            <ReadonlyField label="Lote" value={viewingEntity?.address_complement?.lot || '-'} />
                        </Col>
                        <Col span={8}>
                            <ReadonlyField
                                label="Tipo"
                                value={viewingEntity?.address_complement?.building_or_house === 'building' ? 'Edifício' : 'Casa'}
                            />
                        </Col>
                        <Col span={8}>
                            <ReadonlyField label="Andar" value={viewingEntity?.address_complement?.floor || '-'} />
                        </Col>
                        <Col span={8}>
                            <ReadonlyField label="Ponto de Referência" value={viewingEntity?.address_complement?.reference_point || '-'} />
                        </Col>
                        <Col span={12}>
                            <ReadonlyField
                                label="Coordenadas"
                                value={
                                    viewingEntity?.geolocation?.latitude && viewingEntity?.geolocation?.longitude
                                        ? `${viewingEntity?.geolocation.latitude}, ${viewingEntity?.geolocation.longitude}`
                                        : '-'
                                }
                            />
                        </Col>
                        <Col span={6} style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <a href={viewingEntity?.geolocation?.maps_link} target="_blank" rel="noopener noreferrer" style={{ color: '#0026d9' }}>
                                Ver no Google Maps
                            </a>
                        </Col>
                        <Col span={6} style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <a href={viewingEntity?.geolocation?.street_view_link} target="_blank" rel="noopener noreferrer" style={{ color: '#0026d9' }}>
                                Ver no Street View
                            </a>
                        </Col>
                    </Row></div>

                    {/* Dados do Tráfego */}
                    <Divider style={{ fontSize: 13, color: '#666' }}>Dados do Tráfego</Divider>
                    <div className=" bg-neutral-100  rounded-sm p-3 w-full">           <Row gutter={[16, 16]}>
                        <Col span={12}><ReadonlyField label="IP" value={viewingEntity?.client_ip} /></Col>
                        <Col span={12}><ReadonlyField label="Provedor" value={viewingEntity?.ip_isp} /></Col>
                        <Col span={12}>
                            <ReadonlyField
                                label="Tipo de Acesso"
                                value={{
                                    movel: 'Móvel', fixo: 'Fixo', hosting: 'Hosting',
                                    proxy: 'Proxy', local: 'Local', desconhecido: 'Desconhecido'
                                }[viewingEntity?.ip_access_type] ?? '-'}
                            />
                        </Col>
                        <Col span={12}><ReadonlyField label="URL" value={viewingEntity?.url} /></Col>
                        <Col span={12}><ReadonlyField label="Plataforma" value={formatOSDisplay(viewingEntity?.fingerprint?.os)} /></Col>
                        <Col span={12}><ReadonlyField label="Dispositivo" value={formatDevice(viewingEntity?.fingerprint?.device || '-')} /></Col>
                        <Col span={12}><ReadonlyField label="Browser" value={formatBrowserDisplay(viewingEntity?.fingerprint?.browser)} /></Col>
                        <Col span={12}>
                            <ReadonlyField
                                label="TimeZone"
                                value={`${viewingEntity?.fingerprint?.timezone} - ${viewingEntity?.fingerprint?.timezone_name}` || '-'}
                            />
                        </Col>
                        <Col span={12}><ReadonlyField label="Resolução" value={formatResolution(viewingEntity?.fingerprint?.resolution || '-')} /></Col>
                        <Col span={12}><ReadonlyField label="ID Fingerprint" value={viewingEntity?.fingerprint_id || '-'} /></Col>
                    </Row></div>



                </div>

            </div>
        </Modal>
    );
}