import React, { useState, useEffect } from 'react'
import { Toolbar, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import { CandidateFilters } from '@/filters/api'
import { useDebounce } from './hooks/useDebounce'
import type { SelectChangeEvent } from '@mui/material'

interface CandidateFilterToolbarProps {
  onChange: (filters: CandidateFilters) => void
}

const DOMAINS = ['finance', 'technology', 'marketing'] as const
const STATUSES = ['new', 'interview', 'hired'] as const

const isValidDomain = (value: string): value is (typeof DOMAINS)[number] => DOMAINS.includes(value as (typeof DOMAINS)[number])

const isValidStatus = (value: string): value is (typeof STATUSES)[number] => STATUSES.includes(value as (typeof STATUSES)[number])

const texts = {
  name: 'Name',
  domain: 'Position Domain',
  status: 'Status',
  experience: 'Min. Experience (years)',
  reset: 'Reset',
  all: 'All',
}

export const CandidateFilterToolbar: React.FC<CandidateFilterToolbarProps> = ({ onChange }) => {
  const [name, setName] = useState<CandidateFilters['name']>()
  const [domain, setDomain] = useState<CandidateFilters['domain']>()
  const [status, setStatus] = useState<CandidateFilters['status']>()
  const [experience, setExperience] = useState<CandidateFilters['experience']>()

  const debouncedName = useDebounce(name)
  const debouncedExperience = useDebounce(experience)

  useEffect(() => {
    onChange({
      name: debouncedName,
      domain,
      status,
      experience: debouncedExperience,
    })
  }, [debouncedName, debouncedExperience, domain, status, onChange])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name: key, value } = event.target

    switch (key) {
      case 'name':
        setName(value || undefined)
        break
      case 'domain':
        setDomain(value && isValidDomain(value) ? value : undefined)
        break
      case 'status':
        setStatus(value && isValidStatus(value) ? value : undefined)
        break
      case 'experience':
        setExperience(value ? Number(value) : undefined)
        break
      default:
        break
    }
  }

  const handleReset = () => {
    setName(undefined)
    setDomain(undefined)
    setStatus(undefined)
    setExperience(undefined)
    onChange({})
  }

  return (
    <Toolbar
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        alignItems: 'center',
        p: 2,
        backgroundColor: '#fff9c4',
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <TextField label={texts.name} variant="outlined" size="small" value={name ?? ''} onChange={handleChange} name="name" sx={{ minWidth: 180 }} />

      <FormControl sx={{ minWidth: 160 }} size="small">
        <InputLabel>{texts.domain}</InputLabel>
        <Select label={texts.domain} value={domain ?? ''} onChange={handleChange} name="domain">
          <MenuItem value="">{texts.all}</MenuItem>
          {DOMAINS.map((d) => (
            <MenuItem key={d} value={d}>
              {d[0].toUpperCase() + d.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 160 }} size="small">
        <InputLabel>{texts.status}</InputLabel>
        <Select label={texts.status} value={status ?? ''} onChange={handleChange} name="status">
          <MenuItem value="">{texts.all}</MenuItem>
          {STATUSES.map((s) => (
            <MenuItem key={s} value={s}>
              {s[0].toUpperCase() + s.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField label={texts.experience} variant="outlined" size="small" type="number" value={experience ?? ''} onChange={handleChange} name="experience" sx={{ minWidth: 200 }} />

      <Button variant="outlined" color="secondary" onClick={handleReset} sx={{ ml: 'auto' }}>
        {texts.reset}
      </Button>
    </Toolbar>
  )
}
