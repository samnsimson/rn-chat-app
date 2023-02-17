import Constants from 'expo-constants'

type Config = {
    [x: string]: any
}

const env = (): Config => {
    const { NODE_ENV } = process.env
    if (!NODE_ENV) return {}

    const { expoConfig } = Constants
    if (!expoConfig) return {}

    const { extra } = expoConfig
    if (!extra) return {}

    return extra[NODE_ENV]
}

export default { ...env() }
