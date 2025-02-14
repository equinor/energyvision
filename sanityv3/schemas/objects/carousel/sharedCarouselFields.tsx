export const autoPlay = {
  type: 'boolean',
  name: 'autoplay',
  title: 'Autoplay',
  description: 'Whether the carousel should autoplay or not.',
  initialValue: false,
  hidden: ({ parent }: { parent: any }) => !parent?.singleMode,
}
