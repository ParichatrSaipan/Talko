import QuestionPage from './QuestionPage.Component'
import type { MenuDestination } from '../Hamburger/Menu'

function Age({ onBack, onSelect, onMenuNavigate }: { onBack: () => void; onSelect: (option: string) => void; onMenuNavigate?: (destination: MenuDestination) => void }) {
  return (
    <QuestionPage
      title="What is your age?"
      options={['Under 18', '18-24', '25-34', '35-44', '45+']}
      onBack={onBack}
      onSelect={onSelect}
      onMenuNavigate={onMenuNavigate}
    />
  )
}

export default Age
