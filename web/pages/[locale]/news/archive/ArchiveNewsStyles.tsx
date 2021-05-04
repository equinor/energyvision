// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
//TODO cleanup
import archivedStyles from "@equinor/energyvision-legacy-css/dist/css/legacy.minified.css";

const legacyStyles = ():JSX.Element => {
  return <style jsx global>{archivedStyles}</style>;
}

export default legacyStyles
