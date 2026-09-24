import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '4odz5ftz',
    dataset: 'production'
  },
  studioHost: 'drgeoffcashion',
  deployment: {
    appId: 'ga0oq0qk7i1lnbjij3e2julk',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    // false: this environment can't reach sanity-cdn.com, which auto-update builds need
    autoUpdates: false,
  },
})
