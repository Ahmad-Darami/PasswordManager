import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navbar from '@/components/Dashboard/Navbar'
import { useRouter } from 'next/router';
import { useStateContext } from '@/context/StateContext'
import { getPhotoInformation } from '@/backend/Database'
import { getPhotoUrl } from '@/backend/Storage';

const Photo = () => {

  const { user } = useStateContext()

  const router = useRouter()

  const [ photoDbInfo, setPhotoDbInfo ] = useState()
  const [ loading, setLoading ] = useState(true)

  const [ photoId, setFileId ] = useState('');
  const [ photoUrl, setPhotoUrl ] = useState()

  useEffect(() => {
    // Check if the router is ready and the query parameters are populated
    if (router.isReady && router.query) {
      const { photoSlug } = router.query;
      setFileId(photoSlug);
    }
  }, [router.isReady, router.asPath, router.query]);


  useEffect(() => {
    if(photoId !== '' && user){
      fetchPhoto()  
    }
  }, [photoId, user])


  async function fetchPhoto(){
    setLoading(true)
    const photoInformation = await getPhotoInformation(photoId)
    if(!photoInformation){ //sees if a photo actually exists
      return
    }
    setPhotoDbInfo(photoInformation)

    const photoUrl = await getPhotoUrl(photoId)
    setPhotoUrl(photoUrl)
    setLoading(false)
  }

  return (
    <>
      <Navbar />

      <Section>
        {loading ? (
            <div>Loading...</div>
        ) : (
          <PaperDiv>
            {photoUrl ? (
              <>
                <img src={photoUrl} alt="Uploaded Photo" style={{ width: '100%', height: 'auto' }} />
              </>
            ) : (
              <div>Loading your file...</div>
            )}
          </PaperDiv>
        )}
      </Section>
    </>
  )
}

const Section = styled.section`
display: flex;
flex-direction: column;
align-items: center;
max-height: 90vh;
width: 100%;
padding-top: 2vw;
`
const PaperDiv = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
gap: 2vw;
padding-bottom: 4vw;
width: 50%;
`


export default Photo