import nanoid from 'nanoid'
import dayjs from 'dayjs'
import {VotingStatus} from '../../shared/types'
import {callRpc} from '../../shared/utils/utils'
import {strip as omit} from '../../shared/utils/obj'

export const mockVotingDb = new Map([
  createVoting({
    title: `Did Trump win the 2020 election?`,
    desc: `President Trump on Monday threatened to yank the Republican National Convention from Charlotte, N.C., where it is scheduled to be held in August, accusing the state’s Democratic governor of being...`,
    issuer: `0x5A3abB61A9c5475B8243B61A9c5475B8243`,
    totalPrize: 200,
    status: VotingStatus.Open,
    deadline: dayjs().add(Math.floor(Math.random() * 10), 'd'),
    votesCount: Math.floor(Math.random() * 100),
  }),
  createVoting({
    title: `Will oil fall below $1 per barrel?`,
    desc: `The oil market has had a month of significant recovery. Since the historic cuts by Saudi Arabia and Russia took hold, and the US shale industry began to contract, crude prices have jumped around 70 percent and seem to have...`,
    issuer: `0x5A3abB61A9c5475B8243B61A9c5475B8243`,
    totalPrize: 80000,
    status: VotingStatus.Mining,
    deadline: dayjs().add(Math.floor(Math.random() * 10 + 3), 'd'),
    votesCount: Math.floor(Math.random() * 100),
  }),
  createVoting({
    title: `Will the Democrats win the next US election?`,
    desc: `President Trump on Monday threatened to yank the Republican National Convention from Charlotte, N.C., where it is scheduled to be held in August, accusing the state’s Democratic governor of being...`,
    issuer: `0x5A3abB61A9c5475B8243B61A9c5475B8243`,
    totalPrize: 240,
    status: VotingStatus.Archived,
    deadline: dayjs().add(Math.floor(Math.random() * 10 + 3), 'd'),
    votesCount: Math.floor(Math.random() * 100),
  }),
])

export function createVoting(voting) {
  return {
    ...voting,
    id: nanoid(),
    createdAt: Date.now(),
  }
}

export async function fetchVotings({limit} = {limit: 10}) {
  return (
    (
      await (
        await fetch(
          `https://api.idena.io/api/OracleVotingContracts?limit=${limit}`
        )
      ).json()
    ).result || []
  )
}

export function updateVotingList(votings, {id, ...restVoting}) {
  return votings.map(voting =>
    voting.id === id
      ? {
          ...voting,
          ...restVoting,
        }
      : voting
  )
}

export function callContract({from, contract, method, amount, args}) {
  return callRpc(
    'dna_callContract',
    omit({
      from,
      contract,
      method,
      amount,
      args,
    })
  )
}
