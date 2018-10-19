﻿using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebApi.Services;
using WebApi.Dtos;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using WebApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace WebApi.Controllers
{
    
    [Authorize]
    [Route("[controller]")]
    public class MessageController : Controller
    {
        private IMessageService _msgService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public MessageController(
            IMessageService msgService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _msgService = msgService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }
       // [EnableCors("CorsPolicy")]
        [HttpPost("save")]
        public IActionResult save([FromBody]MessageDto msgDto)
        {
            
            

            try
            {
                // save 
                //_msgService.Save(message);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

    }
}