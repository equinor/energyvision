import {defineMigration, set} from 'sanity/migrate'

export default defineMigration({
  title: 'Issue 2496',
  documentTypes: ["page", "news", "magazine", "event"],

  migrate: {
    string(node, path, context) {
      if(node.startsWith("http:")){
        return set(node.replace("http:", "https:"));
      }
    },
    
  },
})
