type OldTopicPageProps = {
  data: {
    title: string
    description: string
    content: string
  }
}

const OldTopicPage = ({ data }: OldTopicPageProps): JSX.Element => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: data?.content,
      }}
    />
  )
}

export default OldTopicPage
