---
name: Introduction to RDF and Linked Data
menu: Conceptual Guides
---

## Resource Description Framework (RDF)

The Resource Description Framework (RDF) is a framework for representing information in the Web.

The underlying structure of any expression in RDF is a collection of triples, each consisting of a subject, a predicate and an object. A set of such triples is called an RDF graph.

![rdf graph](https://www.w3.org/TR/rdf11-concepts/rdf-graph.svg)

Fig. 1 An RDF graph with two nodes (Subject and Object) and a triple connecting them (Predicate)

Recommended Reading:
- [W3C Recommendation] https://www.w3.org/TR/rdf11-concepts/
- [VIDEO] https://www.youtube.com/watch?v=zeYfT1cNKQg&ab_channel=FullstackAcademy
- [COURSE] https://www.cambridgesemantics.com/blog/semantic-university/learn-rdf/
- [PAPERS] https://scholar.google.co.uk/scholar?q=what+is+resource+description+framework&hl=it&as_sdt=0&as_vis=1&oi=scholart&sa=X&ved=0ahUKEwiArMuYl_jYAhXrA8AKHf0pA0QQgQMIJjAA


## Linked Data

Wikipedia defines Linked Data as:
> structured data which is interlinked with other data so it becomes more useful through semantic queries. It builds upon standard Web technologies such as HTTP, RDF and URIs, but rather than using them to serve web pages only for human readers, it extends them to share information in a way that can be read automatically by computers. Part of the vision of linked data is for the Internet to become a global database.

Linked Data follows the following principles:
- All conceptual things should have a name starting with HTTP.
- Looking up an HTTP name should return useful data about the thing in question in a standard format.
- Anything else that that same thing has a relationship with through its data should also be given a name beginning with HTTP.


Recommended Reading:
- [Article by Tim Berners-Lee](https://www.w3.org/DesignIssues/LinkedData.html)
- [Tim Berners-Lee's TED talk](https://youtu.be/OM6XIICm_qo)
- [List of books in different languages](https://www.w3.org/wiki/SwBooks)


Hydra is an extension of W3C's Resource Description Framework (RDF). RDF is widely known as the technology which makes the Semantic Web possible by representing data as Linked Data. RDF is a W3C standard that allows the representation of Knowledge in a specific domain as Knowledge Graphs. Quanta of information are represented as "triples": statements that relate a subject to an object by a predicate. Triples can be stored in different formats. The format used in Hydra and `hydrus` is JSON-LD.

