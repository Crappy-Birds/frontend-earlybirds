import { useEffect, useState } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
//import usePrevious from '../../hooks/usePrevious'
import { injected, portis } from '../../connectors'
import { SUPPORTED_WALLETS } from '../../constants/wallet'
import { WalletOption } from '@/components/WalletOption'
import { isMobile } from 'utils/userAgent'
import { WalletPendingView } from '@/components/WalletPendingView'
import usePrevious from 'hooks/usePrevious'

const MetamaskIcon = '/images/metamask.svg'

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
}

export const Wallets: React.FC = ({}) => {
  // important that these are destructed from the account-specific web3-react context
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { active, account, connector, activate, error, library } =
    useWeb3React()

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)
  //const previousWalletView = usePrevious(walletView)

  const [pendingWallet, setPendingWallet] = useState<
    AbstractConnector | undefined
  >()

  const [pendingError, setPendingError] = useState<boolean>()

  //const previousAccount = usePrevious(account)

  // always reset to account view
  useEffect(() => {
    setPendingError(false)
    setWalletView(WALLET_VIEWS.ACCOUNT)
  }, [])

  // close modal when a connection is successful
  const activePrevious = usePrevious(active)
  const connectorPrevious = usePrevious(connector)
  useEffect(() => {
    if (
      (active && !activePrevious) ||
      (connector && connector !== connectorPrevious && !error)
    ) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [
    setWalletView,
    active,
    error,
    connector,
    activePrevious,
    connectorPrevious,
  ])

  //sign and save user when connection is done
  useEffect(() => {
    if (!!(library && account)) {
      library
        .getSigner(account)
        .signMessage(process.env.NEXT_PUBLIC_SIGN_KEY)
        .then(async (signature: string) => {
          console.log(signature)
          // toast signature success
          // save db: const result = await WalletService.authWallet(account, signature)
          /* if (result) {
            //success save in db
            return Router.replace('/')
          } */
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          //toast error
          console.log(error)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, library])

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = ''
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (name = SUPPORTED_WALLETS[key].name)
      }
      return true
    })

    setPendingWallet(connector) // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING)

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined
    }

    connector &&
      activate(connector, undefined, true)
        .then(async () => {
          await connector.getAccount()
        })
        .catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector) // a little janky...can't use setError because the connector isn't set
          } else {
            setPendingError(true)
          }
        })
  }

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key]
      // check for mobile options
      if (isMobile) {
        //disable portis on mobile for now
        if (option.connector === portis) {
          return null
        }

        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <WalletOption
              onClick={() => {
                option.connector !== connector &&
                  !option.href &&
                  tryActivation(option.connector)
              }}
              id={`connect-${key}`}
              key={key}
              active={option.connector && option.connector === connector}
              color={option.color}
              link={option.href}
              header={option.name}
              subheader={null}
              icon={option.iconURL}
            />
          )
        }
        return null
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <WalletOption
                id={`connect-${key}`}
                key={key}
                color={'#E8831D'}
                header={'Install Metamask'}
                subheader={null}
                link={'https://metamask.io/'}
                icon={MetamaskIcon}
              />
            )
          } else {
            return null //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <WalletOption
            id={`connect-${key}`}
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector)
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null} //use option.descriptio to bring back multi-line
            icon={option.iconURL}
          />
        )
      )
    })
  }

  function getContent() {
    if (error) {
      return (
        <div>
          <h2>
            {error instanceof UnsupportedChainIdError ? (
              <>Wrong Network</>
            ) : (
              <>Error connecting</>
            )}
          </h2>
          <div>
            {error instanceof UnsupportedChainIdError ? (
              <h5>Please connect to the appropriate Ethereum network.</h5>
            ) : (
              <h5>Error connecting. Try refreshing the page.</h5>
            )}
          </div>
        </div>
      )
    }
    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      return <h5>{account}</h5>
    }

    return walletView === WALLET_VIEWS.PENDING ? (
      <WalletPendingView
        connector={pendingWallet}
        error={pendingError}
        setPendingError={setPendingError}
        tryActivation={tryActivation}
      />
    ) : (
      getOptions()
    )
  }

  return <>{getContent()}</>
}
