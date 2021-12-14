import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  // realtime document data
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id)

    const unsubscribe = ref.onSnapshot(snapshot => {
      // documentul exista si are data
      if(snapshot.data()) {
        setDocument({...snapshot.data(), id: snapshot.id})
        setError(null)
      }
      else {
        setError('No such document exists')
      }
    }, err => {
      console.log(err.message)
      setError('Failed to get document')
    })

    // unsubscribe on unmount
    return () => unsubscribe()

  }, [collection, id])

  return { document, error }
}