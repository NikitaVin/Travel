import React, { FC } from "react";
import ContentLoader from "react-content-loader";

export const TownSkeleton: FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="234" rx="20" ry="20" width="270" height="50" />
    <rect x="0" y="307" rx="10" ry="10" width="270" height="88" />
    <rect x="128" y="410" rx="10" ry="10" width="145" height="45" />
    <rect x="0" y="410" rx="10" ry="10" width="107" height="45" />
    <rect x="80" y="434" rx="0" ry="0" width="0" height="0" />
    <rect x="0" y="0" rx="0" ry="0" width="270" height="216" />
  </ContentLoader>
);
