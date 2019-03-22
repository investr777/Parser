package com.example.juridov.parser.controller;

import com.example.juridov.parser.dto.Dto;
import com.example.juridov.parser.entity.Link;
import com.example.juridov.parser.service.LinkService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "/link")
@Api(value = "API", description = "REST Controller API")
public class LinkController {
    private final LinkService linkService;

    @Autowired
    public LinkController(LinkService linkService) {
        this.linkService = linkService;
    }

    @ApiOperation(value = "Get links", response = Link.class)
    @PostMapping
    public List<Link> links(@RequestBody Dto url) throws IOException {
        return linkService.parser(url.getUrl());
    }
//    @ApiOperation(value = "Get links", response = Link.class)
//    @RequestMapping(path = "/link", method = RequestMethod.GET)
//    public List<Link> links(@RequestParam String url) throws IOException {
//        return linkService.parser(url);
//    }

    @ApiOperation(value = "Clear links", response = Link.class)
    @RequestMapping(path = "/link/clear", method = RequestMethod.GET)
    public List<Link> links() {
       return linkService.clearAll();
    }


}
