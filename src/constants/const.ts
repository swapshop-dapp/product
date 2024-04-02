
export const PRODUCT_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DELETED: 'deleted',
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    REJECTED: 'rejected',
}

export const USER_STATUS = {
    ACTIVE: 'active',
    DELETED: 'deleted',
}
export const DB_OPERATIONS = {
    INSERT: 'c',
    UPDATE: 'u',
    DELETE: 'd',
    REPLICATE: 'r',
}
export const TOPICS = {
    HOSTAWAY_CONNECTOR: 'integration.public.pms_connector',
    REQUEST_LOG: 'request.log',
    SC_EVENTS: 'smartcontract.public.events',
    SC_LOGS: 'smartcontract.public.contract_logs',
    ACCOUNT_PUBLIC_USER: 'account.public.user',
    LISTING_PRODUCT: 'listing.public.property',
    CALENDAR_SYNC_SUCCESS: 'integration.calendar_sync_success',
    PRODUCT_CHANGES: 'listing.property_changes',
}

export const CONTRACT_DEPLOY_STATUS = {
    NEW: 'new',
    PROCESSING: 'processing',
    PUBLISHED: 'published',
    ERROR: 'error',
}

export const PUBLISHED_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
}

export const MANUAL_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
}
export const EVENTS = {
    BOOK: 'Book',
    CANCEL: 'Cancel',
    PAYOUT: 'Payout',
    PRODUCT_CREATED: 'PropertyCreated',
    PAYMENT_RECEIVER_UPDATED: 'PaymentReceiverUpdated',
    AUTHORIZED_UPDATED_EVENTS: 'AuthorizedUpdatedEvent',
}
export const AUTHORIZE_TYPES = {
    GRANT: 'Grant',
    REVOKE: 'Revoke',
}
export const LOG_TYPES = {
    PRODUCT_CONTRACT: 'property_contract',
    CONTRACT_CALL: 'contract_call',
}
export const LOG_STATUS = {
    ERROR: 'error',
    SUCCESS: 'success',
}
export const REDIS_CHANNEL = {
    DEPLOY_CONTRACT: 'deploy-contract',
}
export const REDIS_PUBLISHER_CLIENT = 'REDIS_PUBLISHER_CLIENT'
export const REDIS_SUBSCRIBER_CLIENT = 'REDIS_SUBSCRIBER_CLIENT'

export const ENV = {
    LOCAL: 'local',
    DEV: 'dev',
    STAGING: 'staging',
    PROD: 'prod',
}

export const PAGING = {
    PAGE: 1,
    PAGE_SIZE: 50,
    MAX_PAGE_SIZE: 50,
}
export const CURRENCY = {
    USD: 'USD',
    VND: 'VND',
}