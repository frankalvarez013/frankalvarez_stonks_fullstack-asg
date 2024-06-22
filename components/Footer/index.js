//async version/ server side
import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "../../app/i18n/settings";
import { useTranslation } from "../../app/i18n/";

export const Footer = async ({ lng }) => {
  const { t } = await useTranslation(lng, "footer");
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>{{ lng }}</strong> to:{" "}
      </Trans>
      {languages
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && " or "}
              <Link href={`/${l}`}>{l}</Link>
            </span>
          );
        })}
    </footer>
  );
};
