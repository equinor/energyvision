import { ArrayFieldProps } from 'sanity'
export type SingleObjectInputProps = {} & ArrayFieldProps
export const SingleObjectInput = (props: SingleObjectInputProps) => {
  return props.renderDefault(props)
  //return <div> Single Object Input</div>
}
