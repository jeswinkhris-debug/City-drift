# Security Specification: Velocity Peak

## Data Invariants
- A user can only access and modify their own profile based on their `uid`.
- `money` and `totalWins` can only be incremented, never decremented by arbitrary values.
- `ownedCars` must contain valid `CarState` objects.
- Leaderboard entries can only be created by the user who achieved the time.
- Users cannot modify other users' leaderboard entries.
- Document IDs for users must match their Firebase Auth UID.

## The Dirty Dozen Payloads
1.  **Identity Spoofing**: Attempt to update another user's `money`.
2.  **State Shortcut**: Attempt to set `totalWins` to 999999 without racing.
3.  **Negative Currency**: Attempt to set `money` to -1000.
4.  **Ownership Bypass**: Attempt to add a car to `ownedCars` without paying (directly via Firestore update).
5.  **Leaderboard Poisoning**: Attempt to submit a time of 0.001 seconds.
6.  **Leaderboard Hijacking**: Attempt to submit a leaderboard entry for another user's UID.
7.  **Resource Exhaustion**: Attempt to create a document ID that is 1MB long.
8.  **Shadow Update**: Attempt to add a `role: 'admin'` field to a user profile.
9.  **Timestamp Fraud**: Attempt to set `createdAt` to a future date.
10. **Immutable Field Attack**: Attempt to change `uid` in an existing user profile.
11. **Orphaned Record**: Attempt to submit a leaderboard entry for a non-existent track.
12. **Custom Claim Injection**: Attempt to bypass rules using a fake `token.role`.

## Test Runner (Logic Summary)
The rules will be verified using the following gates:
- `isOwner()`: `request.auth.uid == userId`
- `isValidUser()`: Validates strict schema of user profile.
- `isValidLeaderboardEntry()`: Validates time boundaries and identity.
