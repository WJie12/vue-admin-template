import request from '@/utils/request'

export function human() {
  return request({
    url: '/species/human/',
    method: 'get'
  })
}
export function humanBySymbol(symbol) {
  return request({
    url: '/species/human/geneSymbols/' + symbol,
    method: 'get'
  })
}

export function humanById(id) {
  return request({
    url: '/species/human/geneIDs/' + id,
    method: 'get'
  })
}

export function worm() {
  return request({
    url: '/species/worm/',
    method: 'get'
  })
}
export function wormBySymbol(symbol) {
  return request({
    url: '/species/worm/geneSymbols/' + symbol,
    method: 'get'
  })
}

export function wormById(id) {
  return request({
    url: '/species/worm/geneIDs/' + id,
    method: 'get'
  })
}

export function yeast() {
  return request({
    url: '/species/yeast/',
    method: 'get'
  })
}
export function yeastBySymbol(symbol) {
  return request({
    url: '/species/yeast/geneSymbols/' + symbol,
    method: 'get'
  })
}

export function yeastById(id) {
  return request({
    url: '/species/yeast/geneIDs/' + id,
    method: 'get'
  })
}

export function mouse() {
  return request({
    url: '/species/mouse/',
    method: 'get'
  })
}
export function mouseBySymbol(symbol) {
  return request({
    url: '/species/mouse/geneSymbols/' + symbol,
    method: 'get'
  })
}

export function mouseById(id) {
  return request({
    url: '/species/mouse/geneIDs/' + id,
    method: 'get'
  })
}

export function fly() {
  return request({
    url: '/species/fly/',
    method: 'get'
  })
}
export function flyBySymbol(symbol) {
  return request({
    url: '/species/fly/geneSymbols/' + symbol,
    method: 'get'
  })
}

export function flyById(id) {
  return request({
    url: '/species/fly/geneIDs/' + id,
    method: 'get'
  })
}

