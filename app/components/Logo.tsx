import { siteConfigs } from "~/utils/brand/constant";
type Props = {
  width?: number;
  height?: number;
};

export default function Logo({ width, height }: Props) {
  return (
    <img
      src={siteConfigs.siteLogo}
      alt="logo"
      width={width ?? 40}
      height={height ?? 40}
    />
  );
}
