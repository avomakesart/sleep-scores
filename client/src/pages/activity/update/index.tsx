import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Container, Dropdown, DropdownItem, SuspenseSpinner } from '../../../components'
import { useScoreQuery, useUpdateScoreMutation } from '../../../generated/graphql'
import { withApollo } from '../../../utils'
import { formatToHours, generateRange, roundToTwo } from '../../../utils/misc'
import styles from '../../home/home.module.css'

interface UpdateScoreProps {}

const UpdateScore: React.FC<UpdateScoreProps> = ({}) => {
  const [durationInBed, setDurationInBed] = useState<any>([])
  const [selectedDurationInBed, setSelectedDurationInBed] = useState('')

  const [durationAsleep, setDurationAsleep] = useState<any>([])
  const [selectedDurationAsleep, setSelectedDurationAsleep] = useState('')

  const [, setSleepScore] = useState<any>()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const { data, loading, error } = useScoreQuery({ variables: { id: Number(id) } })
  const [updateScore] = useUpdateScoreMutation()

  useEffect(() => {
    const hourRange = generateRange(30, 1440, 30)
    const timeValues = hourRange.map((time) => {
      return {
        id: Math.random() * 56,
        time: formatToHours(time),
        minutes: time,
      }
    })

    setDurationInBed(timeValues)
    setDurationAsleep(timeValues)

    return () => {
      setDurationInBed([])
      setDurationAsleep([])
    }
  }, [])

  const handleCalculateSleepBehavior = async () => {
    setSleepScore(roundToTwo((100 * Number(selectedDurationAsleep)) / Number(selectedDurationInBed)))

    setIsSubmitting(true)
    const { errors } = await updateScore({
      variables: {
        id: Number(id),
        input: {
          duration_asleep: selectedDurationAsleep,
          duration_in_bed: selectedDurationInBed,
          score: String(roundToTwo((100 * Number(selectedDurationAsleep)) / Number(selectedDurationInBed))),
        },
      },
    })

    if (!errors) {
      setTimeout(() => {
        setIsSubmitting(false)
        // setShowOutput(true)
        navigate(-1)
      }, 1000)
    }
  }

  if (loading) return <SuspenseSpinner />
  if (error) {
    return (
      <Container p="17rem 0">
        <h3>Something went wrong, try again later...</h3>
      </Container>
    )
  }

  return (
    <Container>
      <div className={styles.dropdown__container}>
        <Dropdown
          label="Duration in bed"
          placeholder="Choose an option"
          defaultValue={String(data?.score?.duration_in_bed)}
          onSelect={setSelectedDurationInBed}
        >
          {durationInBed.map((inBed: any, index: any) => (
            <DropdownItem key={`${index}-${inBed.i}`} value={String(inBed.minutes)}>
              {inBed.time}
            </DropdownItem>
          ))}
        </Dropdown>
      </div>
      <div className={styles.dropdown__container}>
        <Dropdown
          label="Duration asleep"
          placeholder="Choose an option"
          defaultValue={String(data?.score?.duration_asleep)}
          onSelect={setSelectedDurationAsleep}
        >
          {durationAsleep.map((aSleep: any, _index: number) => (
            <DropdownItem key={`${_index}-${aSleep.i}`} value={String(aSleep.minutes)}>
              {aSleep.time}
            </DropdownItem>
          ))}{' '}
        </Dropdown>
      </div>
      <div className={styles.button__container}>
        <Button
          isDisabled={selectedDurationInBed.length && selectedDurationAsleep.length > 0 ? false : true}
          isLoading={isSubmitting}
          onClick={handleCalculateSleepBehavior}
        >
          Calculate
        </Button>
      </div>
      <div className={styles.output__container}>
        <span>Select time frames in the dropdowns above to get your sleep behavior</span>
      </div>
    </Container>
  )
}
export default withApollo({ ssr: false })(UpdateScore)
