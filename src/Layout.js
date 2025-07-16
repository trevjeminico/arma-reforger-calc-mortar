import { PageBody, PageContent } from "./components/PageBlocks";
import { FEATURE } from "./config";
import HeaderNav from "./components/PageBlocks/Navigation/HeaderNav";
import FooterNav from "./components/PageBlocks/Navigation/FooterNav";

import ModalUpdates from "./components/ModalUpdates";
export default function Layout() {
  const { SHOW_HEADER } = FEATURE;
  return (
    <PageBody>
      {SHOW_HEADER.enable && <HeaderNav flex="none" />}
      <PageContent />
      <FooterNav />
      {FEATURE.SHOW_FOLLOWING_UPDATE && <ModalUpdates />}
    </PageBody>
  );
}
