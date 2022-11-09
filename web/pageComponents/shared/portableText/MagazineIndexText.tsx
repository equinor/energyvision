import { PortableText, PortableTextProps } from '@portabletext/react'
import defaultSerializers from './helpers/defaultSerializers'

const MagazineIndexText = ({ value, ...props }: PortableTextProps) => {
  return <PortableText value={value} components={defaultSerializers} {...props} />
}

export default MagazineIndexText
