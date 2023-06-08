import React from 'react'
import { Container, NetworkStatusContainer } from './styles';
import logo from '../../assets/images/logo.svg';


export default function Header() {
  const [networkStatus, setNetworkStatus] = React.useState(() => navigator.onLine)

  React.useEffect(() => {
    const handleOnlineEvent = (e) => {
      setNetworkStatus(true)
    }
    const handleOfflineEvent = (e) => {
      setNetworkStatus(false)
    }
    window.addEventListener("offline", handleOfflineEvent)
    window.addEventListener("online", handleOnlineEvent)
    return () => {
      window.removeEventListener('offline', handleOfflineEvent)
      window.removeEventListener('online', handleOnlineEvent)
    }
  })

  return (
    <Container>
      <img src={logo} alt="Logo MyContacts" width={201} />
      <NetworkStatusContainer>
        <p>
          {networkStatus ? 'Online' : 'Offline'}
        </p>
    </NetworkStatusContainer>
    </Container>
  );
}
