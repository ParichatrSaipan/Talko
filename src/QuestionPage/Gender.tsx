import QuestionPage from './QuestionPage'

function Gender({ onBack, onSelect }: { onBack: () => void; onSelect: (option: string) => void }) {
  return (
    <QuestionPage
      title="What is your gender?"
      options={['Male', 'Female', 'Prefer not to say']}
      onBack={onBack}
      onSelect={onSelect}
    />
  )
}

export default Gender