import type { CSSProperties } from 'react'
import { getTalkStateClassName, talkStateLabels, type TalkState } from './TalkState'
import body from '../../assets/animation/body.svg'
import closedEye from '../../assets/animation/close-eye.svg'
import closedMouth from '../../assets/animation/close-mouth.svg'
import closedMouthSource from '../../assets/animation/close-mouth.svg?raw'
import leftArm from '../../assets/animation/left-arm.svg'
import leftEar from '../../assets/animation/left-ear.svg'
import leftLeg from '../../assets/animation/left-leg.svg'
import openEye from '../../assets/animation/open-eye.svg'
import purpleEye from '../../assets/animation/open-eye-purple.svg'
import openMouth from '../../assets/animation/open-mouth.svg'
import openMouthSource from '../../assets/animation/open-mouth.svg?raw'
import openMouthAlt from '../../assets/animation/open-mouth2.svg'
import openMouthAltSource from '../../assets/animation/open-mouth2.svg?raw'
import orangeEye from '../../assets/animation/close-eye-orange.svg'
import orangeMouthBaseSource from '../../assets/animation/Vector 9.svg?raw'
import orangeMouthLine from '../../assets/animation/Vector 10.svg'
import rightArm from '../../assets/animation/right-arm.svg'
import rightEar from '../../assets/animation/right-ear.svg'
import rightLeg from '../../assets/animation/right-leg.svg'

const ORANGE_MOUTH_COLOR = '#F68B45'
const PURPLE_MOUTH_COLOR = '#ECC9E7'

function recolorMouth(source: string, color: string) {
	return `data:image/svg+xml,${encodeURIComponent(source.replaceAll('#B7ECFF', color))}`
}

const orangeMouthBase = recolorMouth(orangeMouthBaseSource, ORANGE_MOUTH_COLOR)
const orangeOpenMouth = recolorMouth(openMouthSource, ORANGE_MOUTH_COLOR)
const orangeOpenMouthAlt = recolorMouth(openMouthAltSource, ORANGE_MOUTH_COLOR)
const purpleClosedMouth = recolorMouth(closedMouthSource, PURPLE_MOUTH_COLOR)
const purpleOpenMouth = recolorMouth(openMouthSource, PURPLE_MOUTH_COLOR)
const purpleOpenMouthAlt = recolorMouth(openMouthAltSource, PURPLE_MOUTH_COLOR)

type TalkAvatarProps = {
	state: TalkState
	statusMessage?: string
	variant?: 'default' | 'work' | 'interview'
}

function maskStyle(source: string) {
	return { '--talk-avatar-mask': `url("${source}")` } as CSSProperties
}

function TalkAvatar({ state, statusMessage, variant = 'default' }: TalkAvatarProps) {
	const isWork = variant === 'work'
	const isInterview = variant === 'interview'
	const variantClass = isWork ? 'work' : isInterview ? 'interview' : null
	const openEyeSource = isInterview ? orangeEye : isWork ? purpleEye : openEye
	const closedEyeSource = isInterview ? orangeEye : isWork ? purpleEye : closedEye
	const closedMouthSourceUrl = isWork ? purpleClosedMouth : closedMouth
	const openMouthSourceUrl = isInterview ? orangeOpenMouth : isWork ? purpleOpenMouth : openMouth
	const openMouthAltSourceUrl = isInterview ? orangeOpenMouthAlt : isWork ? purpleOpenMouthAlt : openMouthAlt
	const mouthVariantClass = isWork
		? ' talk-avatar__mouth--work'
		: isInterview
			? ' talk-avatar__mouth--interview'
			: ''

	return (
		// แสดง avatar ของ Talko ตามสถานะการพูด
		<div className={`talk-video ${getTalkStateClassName(state)}${variantClass ? ` talk-video--${variantClass}` : ''}`} aria-label={talkStateLabels[state]}>
			{statusMessage && <span className="talk-turn-prompt" role="status">{statusMessage}</span>}
			<div className={`talk-avatar${variantClass ? ` talk-avatar--${variantClass}` : ''}`} aria-hidden="true">
				<span className="talk-avatar__part talk-avatar__ear talk-avatar__ear--left" style={maskStyle(leftEar)} />
				<span className="talk-avatar__part talk-avatar__ear talk-avatar__ear--right" style={maskStyle(rightEar)} />
				<span className="talk-avatar__part talk-avatar__leg talk-avatar__leg--left" style={maskStyle(leftLeg)} />
				<span className="talk-avatar__part talk-avatar__leg talk-avatar__leg--right" style={maskStyle(rightLeg)} />
				<span className="talk-avatar__part talk-avatar__arm talk-avatar__arm--left" style={maskStyle(leftArm)} />
				<span className="talk-avatar__part talk-avatar__arm talk-avatar__arm--right" style={maskStyle(rightArm)} />
				<span className="talk-avatar__part talk-avatar__body" style={maskStyle(body)} />
				<div className="talk-avatar__eyes">
					<img className="talk-avatar__face talk-avatar__eyes-open" src={openEyeSource} alt="" />
					<img className="talk-avatar__face talk-avatar__eyes-closed" src={closedEyeSource} alt="" />
				</div>
				<div className={`talk-avatar__mouth${mouthVariantClass}`}>
					{isInterview ? (
						<>
							<img className="talk-avatar__face talk-avatar__mouth-closed talk-avatar__mouth-orange-base" src={orangeMouthBase} alt="" />
							<img className="talk-avatar__face talk-avatar__mouth-closed talk-avatar__mouth-orange-line" src={orangeMouthLine} alt="" />
						</>
					) : (
						<img className="talk-avatar__face talk-avatar__mouth-closed" src={closedMouthSourceUrl} alt="" />
					)}
					<img className="talk-avatar__face talk-avatar__mouth-open" src={openMouthSourceUrl} alt="" />
					<img className="talk-avatar__face talk-avatar__mouth-open-alt" src={openMouthAltSourceUrl} alt="" />
				</div>
			</div>
		</div>
	)
}

export default TalkAvatar
