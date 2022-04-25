import React, { useEffect, useState } from 'react'
import { Button, Container, Dropdown, DropdownItem, DocumentIllustration } from '../../components'
import { formatToHours, generateRange, roundToTwo } from '../../utils/misc'
import styles from './home.module.css'
import { useCreateScoreMutation } from '../../generated/graphql'
import { withApollo } from '../../utils'

const Home = () => {
  const [durationInBed, setDurationInBed] = useState<any>([])
  const [selectedDurationInBed, setSelectedDurationInBed] = useState('')

  const [durationAsleep, setDurationAsleep] = useState<any>([])
  const [selectedDurationAsleep, setSelectedDurationAsleep] = useState('')

  const [sleepScore, setSleepScore] = useState<any>()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showOutput, setShowOutput] = useState(false)

  const [createScore] = useCreateScoreMutation()

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

  const handleCalculateSleepScore = async () => {
    setSleepScore(roundToTwo((100 * Number(selectedDurationAsleep)) / Number(selectedDurationInBed)))

    setIsSubmitting(true)
    const { errors } = await createScore({
      variables: {
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
        setShowOutput(true)
      }, 1000)
    }
  }

  return (
    <Container>
      <div className={styles.dropdown__container}>
        <Dropdown label="Duration in bed" placeholder="Choose an option" onSelect={setSelectedDurationInBed}>
          {durationInBed.map((inBed: any, index: any) => (
            <DropdownItem key={`${index}-${inBed.i}`} value={String(inBed.minutes)}>
              {inBed.time}
            </DropdownItem>
          ))}
        </Dropdown>
      </div>
      <div className={styles.dropdown__container}>
        <Dropdown label="Duration asleep" placeholder="Choose an option" onSelect={setSelectedDurationAsleep}>
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
          onClick={handleCalculateSleepScore}
        >
          Calculate
        </Button>
      </div>
      <div className={styles.output__container}>
        <span>Select time frames in the dropdowns above to get your sleep behavior</span>
        {showOutput && (
          <div className={styles.output__card}>
            <div className={styles['output__message--container']}>
              <span>
                <DocumentIllustration width="4rem" height="4rem" />
              </span>
              <span className={styles['output__message--title']}>Your score is:</span>
              <span className={styles.output__message}>{String(sleepScore)}</span>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export default withApollo({ ssr: false })(Home)
