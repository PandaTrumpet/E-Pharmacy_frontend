declare module "react-ellipsis-text" {
  interface EllipsisTextProps {
    text: string;
    length: number;
  }

  const EllipsisText: React.FC<EllipsisTextProps>;
  export default EllipsisText;
}
