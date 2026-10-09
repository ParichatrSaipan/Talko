//หน้า calling
import character from '../../assets/Character_Orange.svg'

type OrangeCharacterProps = {
	className?: string
}

function OrangeCharacter({ className = '' }: OrangeCharacterProps) {
	return (
		<img
			className={`orange-character ${className}`.trim()}
			src={character}
			alt=""
			aria-hidden="true"
		/>
	)
}

export default OrangeCharacter
