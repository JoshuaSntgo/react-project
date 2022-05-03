
import React from 'react'
import { Redirect, Route } from 'react-router'


export const AppRoute = ({ component: Component, ...rest}) => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    return (
        <Route
			{...rest}
			render={(props) => {
                if (!user) {
                    return (
						<Component {...props}/>
					);
                }else if (user.access_level === 1) {
					return (
                        <Redirect
							to={{
								pathname: "/faculty",
								state: {
									from: props.location,
								},
							}}
						/>
					);
				} else {
					return (
						<Redirect
							to={{
								pathname: "/admin/dashboard",
								state: {
									from: props.location,
								},
							}}
						/>
					);
				} 
			}}
		/>
    )
}
export const AdminRoute = ({ component: Component, ...rest}) => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    return (
        <Route
			{...rest}
			render={(props) => {
				if (!user) {
					return(
						<Redirect
							to={{
								pathname: "/",
								state: {
									from: props.location,
								},
							}}
						/>	
					)
				} else if (user.access_level === 2) {
					return (
                        <Component {...props}/>
					);
				} else {
					return (
						<Redirect
							to={{
								pathname: "/",
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}
			}}
		/>
    )
}
export const UserRoute = ({ component: Component, ...rest}) => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    return (
        <Route
			{...rest}
			render={(props) => {
				if (!user) {
					return(
						<Redirect
							to={{
								pathname: "/",
								state: {
									from: props.location,
								},
							}}
						/>	
					)
				} else if (user.access_level === 1) {
					return (
                        <Component {...props}/>
					);
				} else {
					return (
						<Redirect
							to={{
								pathname: "/",
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}
			}}
		/>
    )
}

