import { createStyles, Select, TextInput, Button, Loader } from '@mantine/core';
import { useCallback, useState } from 'react';
import styles from '../styles/Form.module.scss'
import { showNotification } from '@mantine/notifications';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 18,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

export default function Form({ setCorrectedText }: { setCorrectedText: (text: string) => void }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function correctGrammar(formData: {
    prompt: string,
    // n: number,
    // size: string
  }) {
    try {
      setIsLoading(true)
      const response = await fetch('/api/grammar-police', {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        const { errMessage } = await response.json();
        throw new Error(errMessage);
      }
      const { data } = await response.json();
      setCorrectedText(data)
    } catch (error: any) {
      showNotification({
        message: error?.message,
        color: 'red',
        autoClose: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const [formData, setFormData] = useState({
    prompt: "I haven't money",
    // n: 3,
    // size: '256x256'
  })
  const setDataByKey = useCallback((key: string, value: string | null) => {
    setFormData(curr => ({
      ...curr,
      [key]: key === 'n' ? Number(value) : value
    }))
  }, [])
  // You can add these classes as classNames to any Mantine input, it will work the same
  const { classes } = useStyles();

  return (
    <div className={styles.form}>
      <TextInput onChange={(e) => setDataByKey('prompt', e.target.value)} label="Correct this to standard English." defaultValue={formData.prompt} classNames={classes} size="lg" />

      {/* <div className={styles.flex}>
        <Select
          style={{ marginTop: 20, zIndex: 2 }}
          data={['256x256', '512x512', '1024x1024']}
          defaultValue={formData.size}
          label="The size of the generated images."
          classNames={classes}
          onChange={(val) => setDataByKey('size', val)}
        />

        <Select
          style={{ marginTop: 20, zIndex: 2 }}
          data={['1', '2', '3', '4', '5']}
          defaultValue={String(formData.n)}
          label="The number of images to generate."
          classNames={classes}
          onChange={(val) => setDataByKey('n', val)}
        />
      </div> */}

      <div className={styles.button}>
        {isLoading ? <Loader variant='bars' /> : <Button onClick={() => correctGrammar(formData)}>Correct it!</Button>}
      </div>
    </div>
  );
}