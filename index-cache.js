'use strict';

var me = module.exports;
var memoryStorage = {};


/**
 * Cache value
 * Depending on the config, usage frequency, data size and available memory,
 * the data is either stored in memory, in a cache-DB (e.g. memcached or redis) or in the normal DB
 * 
 * @param Object $requestState
 * @param string $key
 * @param mixed $value Will be JSON-stringified for storage in a SQL DB
 * @param boolean $forcePerformance If set to true, even large/less frequently used data will be stored in a more performant way (memory or cache-DB)
 */
var _save
= me.save = function f_cache_save($requestState, $key, $value, $forcePerformance) {
    $forcePerformance = typeof $forcePerformance !== 'undefined' ? $forcePerformance : false;
    
    if (!memoryStorage[$requestState.config.generalConfig.URL.value]) {

        memoryStorage[$requestState.config.generalConfig.URL.value] = {};
    }
    
    memoryStorage[$requestState.config.generalConfig.URL.value][$key] = $value;
};

/**
 * Load cached value
 * If no value was found, nothing is returned
 * 
 * @param Object $requestState
 * @param string $key
 * @result mixed
 */
var _load
= me.load = function f_cache_load($requestState, $key) {
    
    if (!memoryStorage[$requestState.config.generalConfig.URL.value]) {
        
        return;
    }
    
    return memoryStorage[$requestState.config.generalConfig.URL.value][$key];
};

/**
 * Invalidate cached value
 * 
 * @param Object $requestState
 * @param string $key
 * @result mixed
 */
var _invalidate 
= me.invalidate = function f_cache_invalidate($requestState, $key) {
    
    if (memoryStorage[$requestState.config.generalConfig.URL.value]) {
        
        memoryStorage[$requestState.config.generalConfig.URL.value][$key] = undefined;
    }
};
