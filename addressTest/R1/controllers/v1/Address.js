'use strict';

  
      var paginationService = require('../apistrategies/pagination.js');
       var AddressImplementation = require('../implementation/AddressService.js');
    
var AddressData;

        


        module.exports.getAddress = function getAddress (req, res, next) {
        var args = req.swagger.params;
        AddressImplementation.getAddress(args, (error, data) => {
            AddressData = data;
            if (Object.keys(AddressData).length > 0) {
                                res.setHeader('Content-Type', 'application/json');
                                                                                                        console.log('Start Pagination......');
                paginationService.getPages(args.pageNumber.value, args.pageSize.value, AddressData).then(function(result) {
                    res.writeHead(200, {
                        "Total": result.total,
                        "Per-Page": result.pageSize,
                        "Total-Pages": result.totalPages
                    });
                    res.end(JSON.stringify(result.pagedData));
                }).catch(function(error) {
                    res.end(JSON.stringify(error));
                });
                                                                    } else {
                res.end();
            }
        });
    };
    
                
        
    
