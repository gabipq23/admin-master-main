import { useNavigate } from "@tanstack/react-router";
import { ConfigProvider, Dropdown } from "antd";
import { type JSX } from "react";
import { appSetting } from "../../../constants/app-setting/config.const";
import { useAuth } from "@/context/auth-provider";

export function MenuOptions(): JSX.Element {
  const navigate = useNavigate();
  const { user } = useAuth();
  const color = appSetting?.primaryColor
  function navigeteTo(to?: string) {
    if (to) navigate({ to });
  }


  return (
    <div className="flex gap-6 text-neutral-800 dark:text-neutral-400">
      <ConfigProvider
        theme={{
          components: {
            Button: {
              textHoverBg: "transparent"
            },
          },
        }}
      >
        {appSetting.optionsMenu.map((item, index) => {
          if (item.role && item.role !== user?.user?.role) return null;

          const subItems = item.items?.map((subItem, idx) => ({
            key: `${index}-${idx}`,
            label: <a onClick={() => navigeteTo(subItem.to)}>{subItem.label}</a>,
          }));

          if (subItems)
            return (
              <Dropdown
                key={index}
                menu={{ items: subItems }}
                placement="bottomLeft"
                arrow={{ pointAtCenter: true }}
              >
                <a
                  key={index}
                  onClick={() => navigeteTo(item.to)}
                  className="logout-btn cursor-pointer text-[14px] "
                >
                  {item.label}
                </a>
              </Dropdown>
            );

          return (
            <a
              key={index}
              onClick={() => navigeteTo(item.to)}
              className="logout-btn dark cursor-pointer text-[14px] "
            >
              {item.label}
            </a>
          );
        })}
        <style>
          {`
              .logout-btn:hover  {
                color: ${color} !important;
                font-weight: 500;
              }
         
    }
              `}
        </style>
      </ConfigProvider>

    </div>
  );
}
