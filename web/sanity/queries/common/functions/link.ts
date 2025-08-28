const linkFunction = /* groq */ `
fn links::getLinkFields($link) = $link{
  "id":_key,
  "type": select( _type == "link" || _type == "socialMediaLink" => "externalUrl" , "internalUrl"),
  "link": select(_type == "homePageLink" => { "slug": "/", "lang": homePageLanguage}, @->{
    "slug":  slug.current,
    "lang":  select(_type match 'route_*' =>
    content->lang,
    lang
  ),
  }), 
  "href": href,
  "someType": someType
};
`
export default linkFunction
