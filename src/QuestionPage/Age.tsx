import QuestionPage from './QuestionPage'

function Age({ onBack, onSelect }: { onBack: () => void; onSelect: (option: string) => void }) {
  return (
    <QuestionPage
      title="What is your age?"
      options={['Under 18', '18-24', '25-34', '35-44', '45+']}
      onBack={onBack}
      onSelect={onSelect}
    />
  )
}

export default Age