import type { CSSProperties } from 'react'
import { getTalkStateClassName, talkStateLabels, type TalkState } from './TalkState'
import body from '../../assets/animation/body.svg'
import closedEye from '../../assets/animation/close-eye.svg'
import closedMouth from '../../assets/animation/close-mouth.svg'
import leftArm from '../../assets/animation/left-arm.svg'
import leftEar from '../../assets/animation/left-ear.svg'
import leftLeg from '../../assets/animation/left-leg.svg'
import openEye from '../../assets/animation/open-eye.svg'
import openMouth from '../../assets/animation/open-mouth.svg'
import openMouthAlt from '../../assets/animation/open-mouth2.svg'
import rightArm from '../../assets/animation/right-arm.svg'
import rightEar from '../../assets/animation/right-ear.svg'
import rightLeg from '../../assets/animation/right-leg.svg'

type TalkAvatarProps = {
	state: TalkState
	statusMessage?: string
}

function maskStyle(source: string) {
	return { '--talk-avatar-mask': `url("${source}")` } as CSSProperties
}

function TalkAvatar({ state, statusMessage }: TalkAvatarProps) {
	return (
		// แสดง avatar ของ Talko ตามสถานะการพูด
		<div className={`talk-video ${getTalkStateClassName(state)}`} aria-label={talkStateLabels[state]}>
			{statusMessage && <span className="talk-turn-prompt" role="status">{statusMessage}</span>}
			<div className="talk-avatar" aria-hidden="true">
				<span className="talk-avatar__part talk-avatar__ear talk-avatar__ear--left" style={maskStyle(leftEar)} />
				<span className="talk-avatar__part talk-avatar__ear talk-avatar__ear--right" style={maskStyle(rightEar)} />
				<span className="talk-avatar__part talk-avatar__leg talk-avatar__leg--left" style={maskStyle(leftLeg)} />
				<span className="talk-avatar__part talk-avatar__leg talk-avatar__leg--right" style={maskStyle(rightLeg)} />
				<span className="talk-avatar__part talk-avatar__arm talk-avatar__arm--left" style={maskStyle(leftArm)} />
				<span className="talk-avatar__part talk-avatar__arm talk-avatar__arm--right" style={maskStyle(rightArm)} />
				<span className="talk-avatar__part talk-avatar__body" style={maskStyle(body)} />
				<div className="talk-avatar__eyes">
					<img className="talk-avatar__face talk-avatar__eyes-open" src={openEye} alt="" />
					<img className="talk-avatar__face talk-avatar__eyes-closed" src={closedEye} alt="" />
				</div>
				<div className="talk-avatar__mouth">
					<img className="talk-avatar__face talk-avatar__mouth-closed" src={closedMouth} alt="" />
					<img className="talk-avatar__face talk-avatar__mouth-open" src={openMouth} alt="" />
					<img className="talk-avatar__face talk-avatar__mouth-open-alt" src={openMouthAlt} alt="" />
				</div>
			</div>
		</div>
	)
}

export default TalkAvatar
