import { Space, Typography } from "antd";

interface ReadonlyFieldProps {
    label: string;
    value?: string | null;
}
export default function ReadonlyField({ label, value }: ReadonlyFieldProps) {
    return (
        <Space orientation="vertical" size={4} style={{ display: "flex" }}>
            <Typography.Text type="secondary">{label}</Typography.Text>
            <div
                style={{
                    minHeight: 30,
                    padding: "4px 10px",
                    border: "1px solid #d9d9d9",
                    borderRadius: 8,
                    backgroundColor: "rgba(0, 0, 0, 0.015)",
                }}
            >
                <Typography.Text>{value || "-"}</Typography.Text>

            </div>
        </Space>
    );
}
