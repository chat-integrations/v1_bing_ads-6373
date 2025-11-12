import React from "react";
import { getAppPageFromSlug } from "@livechat/developer-sdk";
import {
  AppWidgetProvider,
  AppWidgetProviderKey,
} from "@livechat/developer-ui-react";
import { notFound } from "next/navigation";

const componentMap = {};

interface Section {
  type: keyof typeof componentMap;
}

export default function Page({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    return <></>;
  }

  const page = getAppPageFromSlug(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <AppWidgetProvider
      widgetKey={`${page.product}/${page.widget}` as AppWidgetProviderKey}
    >
      {page.sections?.length ? (
        (page.sections as Section[]).map((section, index) => {
          const Component = componentMap[
            section.type
          ] as () => React.JSX.Element;

          if (!Component) {
            return <>Not found</>;
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return <Component {...(section as any)} key={index} />;
        })
      ) : (
        <></>
      )}
    </AppWidgetProvider>
  );
}
