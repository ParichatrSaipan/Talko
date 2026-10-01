import { useState } from 'react'
import type { FormEvent } from 'react'
import Header from '../Header/Header.Component'
import type { MenuDestination } from '../Hamburger/Menu'
import './EditJob.css'

type EditJobProps = {
	username: string
	role: string
	onSave: (username: string, role: string) => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

function EditJob({ username, role, onSave, onMenuNavigate }: EditJobProps) {
	const [nextUsername, setNextUsername] = useState(username)
	const [nextRole, setNextRole] = useState(role)

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		onSave(nextUsername.trim() || username, nextRole.trim() || role)
	}

	return (
		<main className="edit-job-page">
			<Header onMenuNavigate={onMenuNavigate} />

			<form className="edit-job-form" onSubmit={handleSubmit}>
				<label htmlFor="edit-username">Username</label>
				<input
					id="edit-username"
					type="text"
					value={nextUsername}
					onChange={(event) => setNextUsername(event.target.value)}
				/>

				<label htmlFor="edit-role">Role</label>
				<input
					id="edit-role"
					type="text"
					value={nextRole}
					onChange={(event) => setNextRole(event.target.value)}
				/>

				<button type="submit">Save</button>
			</form>
		</main>
	)
}

export default EditJob
