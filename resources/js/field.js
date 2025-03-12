import IndexField from './components/IndexField'
import DetailField from './components/DetailField'
import FormField from './components/FormField'

Nova.booting((app, store) => {
  app.component('index-localizeddatetime', IndexField)
  app.component('detail-localizeddatetime', DetailField)
  app.component('form-localizeddatetime', FormField)
})
