type ButtonFinishProps = {
	onFinish: () => void
}

function ButtonFinish({ onFinish }: ButtonFinishProps) {
	return (
		<>
			<button className="talk-finish" type="button" onClick={onFinish}>
				Finish the lesson
			</button>
			<style>{`
				.talk-finish {
					position: absolute;
					right: 20px;
					bottom: 48px;
					left: 20px;
					border: 0;
					border-radius: 999px;
					padding: 22px 24px;
					background: linear-gradient(100deg, #9cf2d7 0%, #71c5fb 100%);
					color: #000;
					font: inherit;
					font-size: 20px;
					cursor: pointer;
					box-shadow: 0 12px 28px rgba(74, 199, 223, .18);
					animation: talk-finish-pop .45s cubic-bezier(.2, .9, .3, 1.25) both;
				}

				.talk-finish:hover {
					filter: brightness(1.04);
					transform: translateY(-2px);
				}

				.talk-finish:active {
					transform: scale(.98);
				}

				.talk-finish:focus-visible {
					outline: 3px solid #fff;
					outline-offset: 4px;
				}

				@keyframes talk-finish-pop {
					from {
						opacity: 0;
						transform: translateY(28px) scale(.92);
					}
					to {
						opacity: 1;
						transform: translateY(0) scale(1);
					}
				}

				@media (max-width: 380px) {
					.talk-finish { bottom: 28px; }
				}

				@media (prefers-reduced-motion: reduce) {
					.talk-finish { animation: none; }
				}
			`}</style>
		</>
	)
}

export default ButtonFinish
