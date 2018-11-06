import { RESTDataSource } from 'apollo-datasource-rest';

const axios = require('axios')

export class CoursesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3000/';
    }

    async getAllCourses() {
        const result = await this.get('courses-ms/resources/courses/');
        return result;
    }

    async getACourse(code) {
        const result = await this.get('courses-ms/resources/courses/'+code);

        return result;
    }

    async createACourse(args) {
        args.baseURL = this.baseURL
        return new Promise(function(resolve,reject) {
            axios.post(args.baseURL+'courses-ms/resources/courses/', {
                credits: args.credits,
                name: args.name,
                professor: args.professor,

            })
            .then((res) => {
            console.log(res["data"]);
                resolve(res["data"]);
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    async editACourse(args) {
        var object = await this.getACourse(args.code)

        args.baseURL = this.baseURL
        return new Promise(function(resolve,reject) {
            axios.put(args.baseURL+'courses-ms/resources/courses/'+args.code, {
                credits: (args.hasOwnProperty("credits") ?args.credits:object.credits),
                name: (args.hasOwnProperty("name") ?args.name:object.name),
                professor: (args.hasOwnProperty("professor") ?args.professor:object.professor),
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }

    async deleteACourse(code) {
        this.delete('courses-ms/resources/courses/'+code)
        return "Deleted successfully"
    }
};
