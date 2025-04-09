import IndexField from './components/IndexField'
import DetailField from './components/DetailField'
import FormField from './components/FormField'

import '../css/field.css';

Nova.booting((app, store) => {
  app.component('index-localizeddatetime', IndexField)
  app.component('detail-localizeddatetime', DetailField)
  app.component('form-localizeddatetime', FormField)
})
