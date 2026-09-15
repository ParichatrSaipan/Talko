import QuestionPage from './QuestionPage.Component'
import type { MenuDestination } from '../Hamburger/Menu'

function Gender({ onBack, onSelect, onMenuNavigate }: { onBack: () => void; onSelect: (option: string) => void; onMenuNavigate?: (destination: MenuDestination) => void }) {
  return (
    <QuestionPage
      title="What is your gender?"
      options={['Male', 'Female', 'Prefer not to say']}
      onBack={onBack}
      onSelect={onSelect}
      onMenuNavigate={onMenuNavigate}
    />
  )
}

export default Gender
