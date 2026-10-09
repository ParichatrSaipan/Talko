import { useState } from 'react'
import type { FormEvent } from 'react'
import Header from '../Header/Header.Component'
import type { MenuDestination } from '../Hamburger/Menu'
import './EditJob.css'

type EditJobProps = {
	username: string
	role: string
	roleInterest: string
	onSave: (username: string, role: string, roleInterest: string) => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

function EditJob({ username, role, roleInterest, onSave, onMenuNavigate }: EditJobProps) {
	const [nextUsername, setNextUsername] = useState(username)
	const [nextRole, setNextRole] = useState(role)
	const [nextRoleInterest, setNextRoleInterest] = useState(roleInterest)

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		onSave(
			nextUsername.trim() || username,
			nextRole.trim() || role,
			nextRoleInterest.trim() || roleInterest,
		)
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

				<label htmlFor="edit-role-interest">Role of Interest</label>
				<input
					id="edit-role-interest"
					type="text"
					value={nextRoleInterest}
					onChange={(event) => setNextRoleInterest(event.target.value)}
				/>

				<button type="submit">Save</button>
			</form>
		</main>
	)
}

export default EditJob
