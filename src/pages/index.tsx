import Head from 'next/head'
import Image from 'next/image'
import firebase from 'firebase'
import Router from 'next/router'

import { useState } from 'react'
import { getSession } from 'next-auth/client'
import { Session } from 'next-auth'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'

import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Modal from '@material-tailwind/react/Modal'
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter'

import Header from 'components/Header'
import Login from 'components/Login'
import DocumentRow from 'components/DocumentRow'

import { db } from '../../firebase'

type HomeProps = {
  session: Session
}

export default function Home({ session }: HomeProps) {
  if (!session) return <Login />

  const [showModal, setShowModal] = useState(false)
  const [documentName, setDocumentName] = useState('')
  const [snapshot] = useCollectionOnce(
    db
      .collection('userDocs')
      .doc(session.user.email)
      .collection('docs')
      .orderBy('timestamp', 'desc')
  )

  const createDocument = async () => {
    if (!documentName) return

    const { id } = await db
      .collection('userDocs')
      .doc(session.user.email)
      .collection('docs')
      .add({
        filename: documentName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })

    setDocumentName('')
    setShowModal(false)
    Router.push(`/document/${id}`)
  }

  const modal = (
    <Modal active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <input
          type="text"
          value={documentName}
          onChange={e => setDocumentName(e.target.value)}
          className="outline-none w-full"
          placeholder="Enter name of document..."
          onKeyDown={e => e.key === 'Enter' && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={() => setShowModal(false)}
          ripple="dark"
        >
          Cancel
        </Button>
        <Button color="blue" onClick={createDocument} ripple="dark">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )

  return (
    <div>
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {modal}

      <section className="bg-[#f8f9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              ripple="dark"
              className="border-0"
            >
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>
          <div>
            <div
              onClick={() => setShowModal(true)}
              className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700"
            >
              <Image src="https://links.papareact.com/pju" layout="fill" />
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12">Date created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
        </div>

        {snapshot?.docs.map(document => (
          <DocumentRow
            key={document.id}
            id={document.id}
            fileName={document.data().filename}
            date={document.data().timestamp}
          />
        ))}
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context)

  return {
    props: { session },
  }
}
