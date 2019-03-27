package com.example.juridov.parser.service;

import com.example.juridov.parser.entity.Link;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class LinkService {
    List<Link> fullLinks = new ArrayList<>();

    public List<Link> parser(String url) throws IOException {
        Document document = Jsoup.connect(url).get();
        Elements links = document.select("a[href]");
        if (fullLinks.size() != 0) {
            fullLinks.clear();
        }
        for (Element link : links) {
            String absLink = link.attr("abs:href");
            String nameLink = link.text();
            fullLinks.add(new Link(fullLinks.size() + 1, absLink, nameLink));
        }
        return fullLinks;
    }  
}
