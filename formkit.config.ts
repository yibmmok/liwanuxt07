import { zh } from '@formkit/i18n'
import { DefaultConfigOptions, createInput } from '@formkit/vue'
import liwaDrop from "./components/liwaDrop"
import { applicationIcons, ethereum } from '@formkit/icons'

const config: DefaultConfigOptions = {
	locales: { zh },
	locale: 'zh',
	messages: {
		zh: {
			validation: {
				required({ name }) {
					return `${name} 欄不得空白.`
				}
			}
		}
	},
	inputs: {
		liwaDrop: createInput(liwaDrop, {
			props: ['sVal', 'arrOption'],
		}),
	},	
	icons: {
		...applicationIcons, // spread an entire group of icons
		ethereum, // or add single icons
	}
}

export default config