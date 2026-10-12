import type { PortableTextInputProps } from 'sanity';

export const CompactBlockEditor = (props: PortableTextInputProps) => {
  // check if validations exist
  // @ts-ignore
  /*   const validationRules = schemaType.validation[0]._rules || []
  const characters = value ? toPlainText(value).length : 0 */
  //check if max Character validation exists and get the value
  /*   const max = validationRules
    .filter((rule: any) => rule.flag === 'max')
    .map((rule: any) => rule.constraint)[0] */

  return (
    <div id={'PTE-height-container'}>
      {props.renderDefault({
        ...props,
        // remove the need to activate the PTE
        initialActive: true,
      })}
    </div>
  );
};
