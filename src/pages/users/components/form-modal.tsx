import { useEffect } from "react";
import { Form, Input, Modal, Select, Row, Col, Checkbox, Typography } from "antd";
import {
  useCreateEntity,
  entityPage,
  useUpdateEntity,
  type EntityType,
  type FormValues,
} from "../config-page.const";
import { options } from "@/constants/app-setting/config.const";
interface FormModalProps {
  open: boolean;
  editingEntity: EntityType | null;
  onClose: () => void;
}

export function FormModal({ open, editingEntity, onClose }: FormModalProps) {
  const [form] = Form.useForm<FormValues>();
  const createMutation = useCreateEntity();
  const updateMutation = useUpdateEntity();

  const isEditing = !!editingEntity;
  const isPending = createMutation.isPending || updateMutation.isPending;
  const userType = Form.useWatch("user_type", form);
  const selectedRole = Form.useWatch("role", form);

  const supervisorOptions = ["Nome 1", "Nome 2", "Nome 3"].map((name) => ({
    label: name,
    value: name,
  }));
  const companyOptions = Object.entries(options).map(([id, data]) => ({
    label: data.name,
    value: id,
  }));

  const allRoleOptions = [
    { label: "Admin", value: "admin" },
    { label: "Gestor", value: "gestor" },
    { label: "Diretor", value: "diretor" },
    { label: "Gerente", value: "gerente" },
    { label: "Líder", value: "lider" },
    { label: "Consultor", value: "consultor" },
  ];

  const subCredenciadoRoleOptions = allRoleOptions.filter(
    (option) => option.value === "lider" || option.value === "consultor",
  );

  const showPersonResponsible = ["gerente", "lider", "consultor"].includes(
    selectedRole ?? "",
  );

  useEffect(() => {
    if (open && editingEntity) {
      form.setFieldsValue({
        ...editingEntity,
        company_id: editingEntity.company_id ?? undefined,
        partner_id: editingEntity.partner_id ?? undefined,
        password: undefined,
      });
    } else if (open) {
      form.resetFields();
    }
  }, [open, editingEntity, form]);

  useEffect(() => {
    if (userType === "subcredenciado") {
      const currentRole = form.getFieldValue("role");
      if (!["lider", "consultor"].includes(currentRole)) {
        form.setFieldValue("role", undefined);
      }
      return;
    }
  }, [userType, form]);

  useEffect(() => {
    if (!showPersonResponsible) {
      form.setFieldValue("person_responsible_id", undefined);
    }
  }, [showPersonResponsible, form]);

  async function handleSubmit() {
    const values = await form.validateFields();

    if (isEditing && editingEntity)
      updateMutation.mutate(
        {
          ...editingEntity,
          ...values,
          allow_email_notifications: values.allow_email_notifications ?? false,
          allow_sms_notifications: values.allow_sms_notifications ?? false,
          company_id: values.company_id ?? null,
          partner_id: values.partner_id ?? null,
          ...(values.password ? { password: values.password } : {}),
        },
        { onSuccess: onClose },
      );
    else
      createMutation.mutate(
        {
          ...values,
          company_id: values.company_id ?? null,
          allow_email_notifications: values.allow_email_notifications ?? false,
          allow_sms_notifications: values.allow_sms_notifications ?? false,
          partner_id: values.partner_id ?? null,
          person_responsible_id: values.person_responsible_id ?? "",
          password: values.password!,
          user_type: values.user_type ?? "",
          team: values.team ?? "",
          cnpj: values.cnpj ?? "",
        },
        { onSuccess: onClose },
      );
  }

  return (
    <Modal
      open={open}
      title={
        isEditing ? `Editar ${entityPage.name}` : `Novo(a) ${entityPage.name}`
      }
      okText={isEditing ? "Salvar" : "Criar"}
      cancelText="Cancelar"
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={isPending}
      destroyOnHidden
      width={910}
    >
      <Form
        form={form}
        layout="vertical"
        style={{ marginTop: 16 }}
      // requiredMark="optional"
      >
        <Row gutter={16}>
          <Col span={7}>
            <Form.Item
              name="user_type"
              label="Tipo de Usuário"
              rules={[{ required: true, message: "Selecione o tipo de usuário" }]}
            >
              <Select
                placeholder="Selecione..."
                options={[
                  { label: "Equipe", value: "equipe" },
                  { label: "Subcredenciado", value: "subcredenciado" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="name"
              label="Nome"
              rules={[{ required: true, message: "Informe o nome" }]}
            >
              <Input placeholder="Nome completo" />
            </Form.Item>
          </Col>

          <Col span={9}>
            <Form.Item
              name="password"
              label="Senha"
              rules={[{ required: !isEditing, message: "Informe a senha" }]}
            >
              <Input.Password
                placeholder={
                  isEditing
                    ? "Deixe em branco para manter a senha atual"
                    : "Digite a senha"
                }
              />
            </Form.Item></Col>
        </Row>

        <Row gutter={16}>
          <Col span={7}>
            <Form.Item
              name="telephone"
              label="Telefone"
              rules={[{ required: true, message: "Informe o telefone" }]}
            >
              <Input placeholder="(00) 00000-0000" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={userType === "subcredenciado" ? "cnpj" : "cpf"}
              label={userType === "subcredenciado" ? "CNPJ" : "CPF"}
              rules={[{ required: true, message: `Informe o ${userType === "subcredenciado" ? "CNPJ" : "CPF"}` }]}
            >
              <Input placeholder={userType === "subcredenciado" ? "00.000.000/0000-00" : "000.000.000-00"} />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Informe o email" },
                { type: "email", message: "Email inválido" },
              ]}
            >
              <Input placeholder="exemplo@email.com" />
            </Form.Item>
          </Col>



        </Row>

        <Row gutter={16}>
          <Col span={7}>
            <Form.Item name="company_id" label="Empresa">
              <Select
                placeholder="Selecione..."
                options={companyOptions}

              />

            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="partner_id" label="Parceiro">
              <Input placeholder="Opcional" />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              name="role"
              label="Nível de Acesso"
              rules={[{ required: true, message: "Selecione o papel" }]}
            >
              <Select
                placeholder="Selecione..."
                options={
                  userType === "subcredenciado"
                    ? subCredenciadoRoleOptions
                    : allRoleOptions
                }
              />
            </Form.Item>
          </Col>
          {showPersonResponsible && (
            <Col span={7}>
              <Form.Item
                name="person_responsible_id"
                label="Responsável"
                rules={[{ required: true, message: "Selecione o responsável" }]}
              >
                <Select
                  placeholder="Selecione..."
                  options={supervisorOptions}
                />
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Typography>Permissões de Notificação</Typography>
            <div className="flex gap-2">
              <Form.Item name="allow_email_notifications" >

                <Row>
                  <Col span={12}>
                    <Checkbox value="email">Email</Checkbox>
                  </Col>
                </Row>

              </Form.Item>
              <Form.Item name="allow_sms_notifications">

                <Row>
                  <Col span={12}>
                    <Checkbox value="sms">SMS</Checkbox>
                  </Col>
                </Row>

              </Form.Item>
            </div>

          </Col>
        </Row>


      </Form>
    </Modal >
  );
}
